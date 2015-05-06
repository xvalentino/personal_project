class PopulationsController < ApplicationController
  respond_to :json

  def counties
      respond_with Population.new.counties
  end
end
