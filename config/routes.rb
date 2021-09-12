Rails.application.routes.draw do

    resources :pets, only: %i[index show create destroy update]

    get '/cemetery', to: 'pets#cemetery'

    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    resources :users, only: %i[update destroy]

    post '/login', to: 'sessions#login'
    delete '/logout', to: 'sessions#logout'

end
