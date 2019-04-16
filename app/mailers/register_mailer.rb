class RegisterMailer < ApplicationMailer

  def free_eval(params)
    @email = params[:email]
    @name = params[:name]
    @times = params[:times]
    @goals = params[:goals]
    @experience = params[:experience]
    @age = params[:age]
    @injury_history = params[:injury_history]
    mail(from: @email, to: 'flightperformanceandfitness@gmail.com', subject: 'Free Evaluation Sign up')
  end

  def confirm(params)
    email = params[:email]
    @name = params[:name]
    mail(from: 'flightperformanceandfitness@gmail.com', to: email, subject: 'Flight Performance Free Evaluation')
  end
end
