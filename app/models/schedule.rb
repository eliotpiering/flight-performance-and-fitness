class Schedule
  attr_accessor :start_time, :end_time, :name, :description, :class_name, :overlap

  def initialize(start_time, end_time, name, description = "", class_name, options)
    @start_time = start_time
    @end_time = end_time
    @name = name
    @description = description
    @class_name = class_name
    @overlap = options.delete(:overlap)
  end

  def duration
    ((end_time - start_time) * 24).to_f
  end

  def self.start
    DateTime.now.beginning_of_week
  end

  def self.generate
    (start..(start + 7.days)).collect do |day|
      events(day)
    end.flatten
  end

  def self.events(day)
    case (day.strftime("%A").downcase.to_sym)
    when :sunday
      [empty(day, 5, 5), training_session(day, 10, 1.5), empty(day, 11.5, 8.5)]
    when :monday
      [training_session(day, 5, 1.5), conditioning(day, 6.25, 1, overlap: 1), training_session(day, 6.5, 1.5), training_session(day, 8, 2), empty(day, 10, 5.5),
       training_session(day, 15.5, 1.5), training_session(day, 17, 1.5), conditioning(day, 18.25, 1, overlap: 13), training_session(day, 18.5, 1.5)]
    when :tuesday
      training_day(day)
    when :wednesday
      [training_session(day, 5, 1.5), conditioning(day, 6.25, 1, overlap: 1), training_session(day, 6.5, 1.5), training_session(day, 8, 2), empty(day, 10, 5.5),
       training_session(day, 15.5, 1.5), training_session(day, 17, 1.5), conditioning(day, 18.25, 1, overlap: 13), training_session(day, 18.5, 1.5)]
    when :thursday
      training_day(day)
    when :friday
      [training_session(day, 5, 1.5), conditioning(day, 6.25, 1, overlap: 1), training_session(day, 6.5, 1.5), training_session(day, 8, 2), empty(day, 10, 5.5),
       training_session(day, 15.5, 1.5), training_session(day, 17, 1.5), conditioning(day, 18.25, 1, overlap: 13), training_session(day, 18.5, 1.5)]
    when :saturday
      [empty(day, 5, 3), conditioning(day, 8, 1.5), training_session(day, 9.5, 1.5), training_session(day, 11, 1.5), empty(day, 12.5, 7.5)]
    end
  end

  def self.training_day(day)
    [training_session(day, 5, 1.5), training_session(day, 6.5, 1.5), training_session(day, 8, 2), empty(day, 10, 5.5),
     training_session(day, 15.5, 1.5), training_session(day, 17, 1.5), training_session(day, 18.5, 1.5)]
  end

  def self.event(name, description = "", class_name, date, start_hour, duration, options)
    start = date + start_hour.hours
    end_time = start + duration.hours
    new(start, end_time, name, description, class_name, options)
  end

  def self.no_classes(date, start_hour, duration = 1)
    event("", "", "empty-event", date, start_hour, duration, {})
  end

  def self.empty(date, start_hour, duration = 1)
    event("Closed", "Closed", "empty-event", date, start_hour, duration, {})
  end

  def self.open_gym(date, start_hour, duration = 1)
    event("Open Gym", "Drop in for a workout. Flight training staff will work with you towards your fitness goals", "open-gym", date, start_hour, duration, {})
  end

  def self.training_session(date, start_hour, duration = 1, options = {})
    event("Training session", "Open gym with a limited group size. By Appointment Only", "training-session", date, start_hour, duration, options)
  end

  def self.conditioning(date, start_hour, duration = 1, options = {})
    event("Group classes", "Small group, boot camp style conditioning class in a fun team environment.", "conditioning", date, start_hour, duration, options)
  end

  def self.personal_training(date, start_hour, duration = 1)
    event("Personal Training", "Dedicated Personal Training. By Appointment Only", "personal-training", date, start_hour, duration, {})
  end

  def self.boxing(date, start_hour, duration = 1)
    event("Boxing", "", "boxing", date, start_hour, duration, {})
  end
end
