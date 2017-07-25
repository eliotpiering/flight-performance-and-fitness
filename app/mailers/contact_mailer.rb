class ContactMailer < ApplicationMailer

  def contact_email(contact_params)
    @name = contact_params[:name]
    @email = contact_params[:email]
    @message = contact_params[:message]
    mail(from: @email, to: 'dgutheil22@gmail.com', subject: 'Someone reached out')
  end
end
