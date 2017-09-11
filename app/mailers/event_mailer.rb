class EventMailer < ApplicationMailer

  def thanks_for_registering_for(event_registration)
    @email = event_registration.email
    @event = event_registration.event
    mail(from: 'flightperformanceandfitness@gmail.com', to: @email, subject: "Registration for #{@event.title}")
  end

  def someone_registered_for(event_registration)
    @email = event_registration.email
    @event = event_registration.event
    mail(to: 'flightperformanceandfitness@gmail.com', from: @email, subject: "Someone Registered for #{@event.title}")
  end
end
