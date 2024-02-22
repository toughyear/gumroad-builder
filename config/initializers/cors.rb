Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000', 'https://yourfrontenddomain.com' # Adjust the origins according to your frontend domain(s)
    resource '*',
 headers: :any,
 methods: [:get, :post, :put, :patch, :delete, :options, :head],
 credentials: true # Set to false if you don't need to support credentials
 end
end
