class RegisterMailer < ApplicationMailer

  def free_eval(params)
    @email = params[:email]
    @times = params[:times]
    @message = params[:message]
    mail(from: @email, to: 'flightperformanceandfitness@gmail.com', subject: 'Free Evaluation Sign up')
  end
end
