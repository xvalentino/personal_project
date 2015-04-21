require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  describe 'when a user visits the homepage it' do
    it 'they hit the index page' do
      get '/'
    end
  end
end
