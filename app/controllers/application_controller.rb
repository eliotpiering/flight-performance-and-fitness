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
    if robot?
      logger.warn "NEW SPAMMER: #{register_params.slice(:name, :email).to_json}"
    else
      RegisterMailer.free_eval(register_params).deliver_now
      RegisterMailer.confirm(register_params).deliver_now
    end
  end

  def submit_youth_performance_registration
    if robot?
      logger.warn "NEW SPAMMER: #{youth_performance_params.slice(:name, :email).to_json}"
    else
      RegisterMailer.youth_registration_confirm(youth_performance_params).deliver_now
      RegisterMailer.youth_registration_submitted(youth_performance_params).deliver_now
    end
  end

  def privacy
  end

  def coronavirus
  end

  def internship
  end

  def about
    @coaches = Coach.all
  end

  private

  def robot?
    params[:my_unique_email_confirmation].present?
  end

  def register_params
    params.permit(:name, :email, :why_flight, :goals, :experience, :age, :injury_history, :how_did_you_hear_about_us, :times_string, :stress_level, :fitness_level, :sleep_level, :nutritional_level, times: {})
  end

  def youth_performance_params
    params.permit(:name, :email, :number_of_kids, :age_of_kids, :name_of_kids, :sport_of_kids)
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
