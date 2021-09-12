Rails.application.routes.draw do
  namespace :api do
    resources :pets, only: %i[index show create destroy update]

    get '/cemetery', to: 'pets#cemetery'

    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    resources :users, only: %i[update destroy]

    post '/login', to: 'sessions#login'
    delete '/logout', to: 'sessions#logout'
  end
  
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
