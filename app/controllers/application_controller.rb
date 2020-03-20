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
    params[:start_date] = Schedule.start
  end

  def submit_evaluation
    RegisterMailer.free_eval(register_params).deliver_now
    RegisterMailer.confirm(register_params).deliver_now
  end

  def privacy
  end

  def coronavirus
  end


  private

  def register_params
    params.permit(:name, :email, :goals, :experience, :age, :injury_history, :how_did_you_hear_about_us, times: {})
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end

end
