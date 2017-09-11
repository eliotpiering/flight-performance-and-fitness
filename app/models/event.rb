class Event < ApplicationRecord

  has_many :event_registrations

  def open_spots
    spots_left = available_spots - event_registrations.count
    "#{spots_left} out of #{available_spots}"
  end
end
