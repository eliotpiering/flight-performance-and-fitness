class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  end

  def submit_contact
    ContactMailer.contact_email(contact_params).deliver_now
  end

  def events
    @upcoming_events = Event.where("event_date >= ?", Date.today)
  end

  def evaluation
  end

  def calendar
    @schedule = Schedule.generate
  end

  def submit_evaluations
    RegisterMailer.free_eval(register_params).deliver_now
  end


  private

  def register_params
    params.permit(:email, :message, times: {})
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end

end
