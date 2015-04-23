Rails.application.routes.draw do
  get '/auth/:provider/callback', to: 'sessions#create'
  root "dashboard#index"
  get '/map', to: "map#show"
  get '/account', to: "dashboard#show"
end
