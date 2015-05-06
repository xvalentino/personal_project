class PopulationsController < ApplicationController
  respond_to :json

  def counties
    respond_with Population.new.counties
  end

  def shapes
    respond_with Population.new.shapes
  end
end
