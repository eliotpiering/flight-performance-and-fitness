require 'oembed'

class OembedController < ApplicationController

  before_action :authenticate_user!

  def create
    url = params["instagram_url"]
    resource = OEmbed::Providers.get(url)
    render json: {html: resource.html}
  rescue OEmbed::NotFound
    render json: {error: "Something went wrong getting content for #{url}. Double check that is the correct url."}, status: 400
  end

end
