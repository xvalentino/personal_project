Rails.application.routes.draw do
  root "dashboard#index"
  get '/auth/:provider/callback/', to: 'sessions#create'
  get '/map', to: "map#show"
  get '/account', to: "dashboard#show"
  get 'counties', to: "populations#counties"
  get 'shapes', to: "populations#shapes"
end
