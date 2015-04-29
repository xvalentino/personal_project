require "rails_helper"
OmniAuth.config.test_mode = true

RSpec.feature "User login", type: :feature do
  scenario "should be able to login with Twitter Omniauth" do
    visit root_path
    mock_omniauth_user
    click_link_or_button "Twitter Sign In"
    expect(current_path).to eq(account_path)
  end

  scenario "should be able to see their information after login" do
    visit root_path
    mock_omniauth_user
    click_link_or_button "Twitter Sign In"
    expect(page).to have_content "mock_user"
  end
end

private

def mock_omniauth_user
  OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
    "provider" => "twitter",
    "uid"      => "123456",
    "info" => {
      "nickname" =>  "mock_user",
      "image"    => "mock_user_thumbnail_url",
      "bio"    => "mock_user_bio"
    },
    "extra" => {
      "raw_info" => {
        "profile_banner_url" => "mock_user_banner_url"
      }
    },
    "credentials" => {
      "token"  => "mock_token"
    }
  })
end
