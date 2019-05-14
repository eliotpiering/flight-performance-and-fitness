class Schedule 

  attr_accessor :start_time, :end_time, :name, :description, :class_name, :overlap

  def initialize(start_time, end_time, name, description="", class_name, options)
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

  def self.legend
    [:open_gym, :conditioning, :closed]
  end

  def self.events(day)
    case(day.strftime("%A").downcase.to_sym)
    when :sunday
      [empty(day, 5.5, 3), conditioning(day, 9), empty(day, 10, 9)]
    when :monday
      [open_gym(day, 5.5, 5.5), empty(day, 11, 4), open_gym(day, 15, 5)]
    when :tuesday
      [open_gym(day, 5.5, 5.5), empty(day, 11, 4), open_gym(day, 15, 5), conditioning(day, 18, 1, overlap: 12)]
    when :wednesday
      [open_gym(day, 5.5, 5.5), empty(day, 11, 4), open_gym(day, 15, 5)]
    when :thursday
      [open_gym(day, 5.5, 5.5), empty(day, 11, 4), open_gym(day, 15, 5), conditioning(day, 18, 1, overlap: 12)]
    when  :friday
      [open_gym(day, 5.5, 5.5), empty(day, 11, 4), open_gym(day, 15, 5)]
    when :saturday
      [empty(day, 5.5, 1.5), open_gym(day, 7, 5), conditioning(day, 8.5, 1, overlap: 2.5), empty(day, 8.5, 8),]
    end
  end

  def self.event(name, description="", class_name, date, start_hour, duration, options)
    start = date + start_hour.hours
    end_time = start + duration.hours
    new(start, end_time, name, description, class_name, options)
  end

  def self.empty(date, start_hour, duration=1)
    event("Closed", "Closed", "empty-event", date, start_hour, duration, {})
  end

  def self.open_gym(date, start_hour, duration=1)
    event("Open Gym", "Drop in for a workout. Flight training staff will work with you towards your fitness goals", "open-gym", date, start_hour, duration, {})
  end

  def self.conditioning(date, start_hour, duration=1, options={})
    event("Conditioning", "Small group, boot camp style conditioning class in a fun team environment.", "conditioning", date, start_hour, duration, options)
  end

  def self.personal_training(date, start_hour, duration=1)
    event("Personal Training", "Dedicated Personal Training. By Appointment Only", "personal-training", date, start_hour, duration, {})
  end

  def self.boxing(date, start_hour, duration=1)
    event("Boxing", "", "boxing", date, start_hour, duration, {})
  end


end
