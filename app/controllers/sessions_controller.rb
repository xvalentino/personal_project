require 'pp'
class SessionsController < ApplicationController
  def create
    user = User.find_or_create_from_auth(request.env['omniauth.auth'])
    PP.pp request.env['omniauth.auth']

    if user
      session[:user_id] = user.id
      redirect_to '/account'
    else
      redirect_to root_path
    end
  end
end
