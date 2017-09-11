class ChargesController < ApplicationController
  def new
  end

  def create
    # Amount in cents
    @event = Event.find(params.require(:event_id))
    amount = @event.amount

    # customer = Stripe::Customer.create(
    #   :email => params[:stripeEmail],
    #   :source  => params[:stripeToken]
    # )

    # Stripe::Charge.create(
    #   :customer    => customer.id,
    #   :amount      => amount,
    #   :description => "purchased ticket to event #{@event.title}",
    #   :currency    => 'usd'
    # )


    event_registration = EventRegistration.create!(event: @event, email: params[:stripEmail])

    EventMailer.thanks_for_registering_for(event_registration).deliver_now
    EventMailer.someone_registered_for(event_registration).deliver_now


  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to events_path
  end

end
