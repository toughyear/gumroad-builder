class AuthController < ApplicationController
  def gumroad
    client_id = ENV['GUMROAD_APPLICATION_ID']
    # Use DEPLOYMENT_URL if it exists, otherwise fallback to localhost
    base_url = ENV['DEPLOYMENT_URL'] || "http://localhost:3000"
    redirect_uri = "#{base_url}/auth/gumroad/callback"
    scope = "view_profile" # Customize based on the permissions you need
    gumroad_url = "https://gumroad.com/oauth/authorize?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=#{scope}"
    redirect_to gumroad_url, allow_other_host: true
  end

  def gumroad_callback
    code = params[:code]
    # Use DEPLOYMENT_URL if it exists, otherwise fallback to localhost
    base_url = ENV['DEPLOYMENT_URL'] || "http://localhost:3000"
    redirect_uri = "#{base_url}/auth/gumroad/callback"

    response = RestClient.post('https://gumroad.com/oauth/token', {
      client_id: ENV['GUMROAD_APPLICATION_ID'],
      client_secret: ENV['GUMROAD_APP_SECRET'],
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri
    })
    access_token = JSON.parse(response.body)['access_token']

    # Redirect to the root path with the access token in the URI
    redirect_to root_url(access_token: access_token), notice: "Gumroad authentication successful"
  end
end
