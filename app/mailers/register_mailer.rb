class RegisterMailer < ApplicationMailer
  def free_eval(params)
    @email = params[:email]
    @name = params[:name]
    @times_string = params[:times_string]
    @goals = params[:goals]
    @why_flight = params[:why_flight]
    @experience = params[:experience]
    @age = params[:age]
    @injury_history = params[:injury_history]
    @how_did_you_hear_about_us = params[:how_did_you_hear_about_us]
    @fitness_level = params[:fitness_level]
    @stress_level = params[:stress_level]
    @sleep_level = params[:sleep_level]
    @nutritional_level = params[:nutritional_level]
    mail(from: @email, to: "flightperformanceandfitness@gmail.com", subject: "Free Evaluation Sign up")
  end

  def confirm(params)
    email = params[:email]
    @name = params[:name]
    mail(from: "flightperformanceandfitness@gmail.com", to: email, subject: "Flight Performance Free Evaluation")
  end
end
