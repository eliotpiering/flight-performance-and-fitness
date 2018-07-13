class Schedule 

  attr_accessor :start_time, :end_time, :name, :description, :class_name

  def initialize(start_time, end_time, name, description="", class_name)
    @start_time = start_time
    @end_time = end_time
    @name = name
    @description = description
    @class_name = class_name
  end

  def duration
    ((end_time - start_time) * 24).to_f
  end

  def self.start
    DateTime.now.beginning_of_week
  end

  def self.generate
    (start..(start + 6.days)).collect do |day|
      events(day)
    end.flatten
  end

  def self.legend
    [:open_gym, :conditioning, :personal_training, :boxing]
  end

  def self.events(day)
    case(day.strftime("%A").downcase.to_sym)
    when :sunday
      []
    when :monday
      [open_gym(day, 5.5, 4.5), personal_training(day, 10, 5), open_gym(day, 15, 5)]
    when :tuesday
      [conditioning(day, 5.5), open_gym(day, 6.5, 2.5), conditioning(day, 9), personal_training(day, 10, 5), open_gym(day, 15, 2.5), conditioning(day, 17.5), open_gym(day, 18.5)]
    when :wednesday
      [open_gym(day, 5.5, 4.5), personal_training(day, 10, 5), open_gym(day, 15, 5)]
    when :thursday
      [conditioning(day, 5.5), open_gym(day, 6.5, 2.5), conditioning(day, 9), personal_training(day, 10, 5), open_gym(day, 15, 2.5), conditioning(day, 17.5), open_gym(day, 18.5)]
    when  :friday
      [open_gym(day, 5.5, 4.5), personal_training(day, 10, 5), open_gym(day, 15, 5)]
    when :saturday
      [empty(day, 5.5, 3), conditioning(day, 8.5), open_gym(day, 9.5, 0.5), boxing(day, 10)]
    end
  end

  def self.event(name, description="", class_name, date, start_hour, duration)
    start = date + start_hour.hours
    end_time = start + duration.hours
    new(start, end_time, name, description, class_name)
  end

  def self.empty(date, start_hour, duration=1)
    event("", "", "empty-event", date, start_hour, duration)
  end

  def self.open_gym(date, start_hour, duration=1)
    event("Open Gym", "Drop in for a workout. Flight training staff will work with you towards your fitness goals", "open-gym", date, start_hour, duration)
  end

  def self.conditioning(date, start_hour, duration=1)
    event("Conditioning", "Small group, boot camp style conditioning class in a fun team environment.", "conditioning", date, start_hour, duration)
  end

  def self.personal_training(date, start_hour, duration=1)
    event("Personal Training", "Dedicated Personal Training. By Appointment Only", "personal-training", date, start_hour, duration)
  end

  def self.boxing(date, start_hour, duration=1)
    event("Boxing", "", "boxing", date, start_hour, duration)
  end


end
