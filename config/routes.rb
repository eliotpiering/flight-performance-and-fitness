Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'

  get 'about', to: 'application#about'
  get 'services', to: 'application#services'
  get 'contact', to: 'application#contact'
  post 'contact', to: 'application#submit_contact'
  get 'testimonials', to: 'application#testimonials'
  get 'events', to: 'application#events'

  post 'charges/:event_id', to: 'charges#create', as: 'charges'
end
