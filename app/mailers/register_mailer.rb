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
    mail(to: "flightperformanceandfitness@gmail.com", subject: "Free Intro Session Sign up")
  end

  def confirm(params)
    email = params[:email]
    @name = params[:name]
    mail(from: "flightperformanceandfitness@gmail.com", to: email, subject: "Flight Performance Free Intro Session")
  end

  def youth_registration_submitted(params)
    email = params[:email]
    @params = params
    mail(to: "flightperformanceandfitness@gmail.com", subject: "Youth Performance Sign up")
  end

  def youth_registration_confirm(params)
    email = params[:email]
    @name = params[:name]
    mail(from: "flightperformanceandfitness@gmail.com", to: email, subject: "Flight Performance Youth Performance Registration")
  end
end
