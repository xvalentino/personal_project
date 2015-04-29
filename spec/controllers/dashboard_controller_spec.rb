require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  describe 'dashboard controller index' do
    it "renders the index" do
      get :index
      expect(response).to render_template("index")
    end
  end
end
