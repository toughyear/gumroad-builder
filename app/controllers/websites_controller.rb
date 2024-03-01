class WebsitesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only: [:index, :create, :update, :destroy]
  before_action :set_website, only: [:show, :update, :destroy]

  # GET /websites
  def index
    @websites = Website.where(owner_id: @current_user_id)
    render json: @websites
  end

  # GET /websites/:id
  def show
    render json: @website
  end

  def update
    if @website.update(website_params.merge(version: @website.version + 1)) # Increment version by 1
      render json: @website
    else
      render json: @website.errors, status: :unprocessable_entity
    end
  end


  # DELETE /websites/:id
  def destroy
    @website.destroy
  end



  # POST /websites
  def create
    @website = Website.new(website_params.merge(owner_id: @current_user_id))

    if @website.save
      render json: @website, status: :created, location: @website
    else
      render json: @website.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_website
      begin
        # Try to find the website by ID or fallback to finding by URL if ID is not found
        @website = Website.find_by(id: params[:id]) || Website.find_by(url: params[:id])
        if @website.nil?
          render json: { error: 'Website not found' }, status: :not_found
          return
        end

        # Check if the website is not published and if the user is not authenticated
        if !@website.published? && @current_user_id.nil?
          render json: { error: 'Unauthorized' }, status: :unauthorized
          return
        end
      rescue => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end


    def authenticate_user
      access_token = request.headers['Authorization']
      if access_token.nil? || !access_token.start_with?('Bearer ')
        render json: { error: "missing or malformed Authorization header" }, status: :unauthorized
        return
      end

      begin
        token = access_token.split(' ')[1]
        response = RestClient.get("https://api.gumroad.com/v2/user", { Authorization: access_token })

        if response.code == 200
          result = JSON.parse(response.body)
          @current_user_id = result['user']['user_id']
          @current_user = result['user']
        else
          render json: { error: "invalid token" }, status: response.code
          return
        end
        rescue RestClient::ExceptionWithResponse => e
          render json: { error: "Unauthorized" }, status: e.response.code
          return
        rescue => e
          logger.error e.message
          render json: { error: "Something went wrong" }, status: :internal_server_error
          return
      end

      head :unauthorized unless @current_user_id
    end

    # Only allow a list of trusted parameters through.
    def website_params
      params.require(:website).permit(:title, :published, :url, :content)
    end
end
