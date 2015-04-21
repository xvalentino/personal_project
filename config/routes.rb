Rails.application.routes.draw do
  root "dashboard#index"
  get '/map', to: "map#show"
end
