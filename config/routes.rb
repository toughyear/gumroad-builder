Rails.application.routes.draw do
  get 'auth/gumroad'
  root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Gumroad Auth routes
  get '/auth/gumroad', to: 'auth#gumroad'
  get '/auth/gumroad/callback', to: 'auth#gumroad_callback'

  # API: /websites
  resources :websites

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Route /edit and /edit/* to SPA
  get '/edit', to: 'homepage#index'
  get '/edit/*path', to: 'homepage#index'

  # Defines the root path route ("/")
  # root "posts#index"
end
