Rails.application.routes.draw do
  devise_for :users, skip: [:registrations]
  as :user do
    get "/sign_in" => "devise/sessions#new" # custom path to login/sign_in
    get 'users/edit' => 'devise/registrations#edit', as: 'edit_user_registration'
    put 'users' => 'devise/registrations#update', as: 'user_registration'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'about', to: 'application#about'
  get 'evaluation', to: 'application#evaluation'
  get 'services', to: 'application#services'
  get 'contact', to: 'application#contact'
  post 'contact', to: 'application#submit_contact'
  get 'testimonials', to: 'application#testimonials'
  get 'events', to: 'application#events'
  get 'calendar', to: 'application#calendar'
  get 'evaluation', to: 'application#evaluation'
  post 'evaluation', to: 'application#submit_evaluation'
  get 'privacy', to: 'application#privacy'
  post 'oembed', to: 'oembed#create'

  post 'charges/:event_id', to: 'charges#create', as: 'charges'

  resources :posts do
    resources :post_tags, only: [:create, :destroy]
  end

  post 'post_medias', to: 'post_medias#create'

  root to: 'application#index'
end
