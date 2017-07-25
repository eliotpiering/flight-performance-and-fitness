class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  end

  def submit_contact
    ContactMailer.contact_email(contact_params).deliver_now
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end

end
