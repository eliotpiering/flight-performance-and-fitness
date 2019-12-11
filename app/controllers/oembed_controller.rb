require 'oembed'

class OembedController < ApplicationController

  before_action :authenticate_user!

  def create
    resource = OEmbed::Providers.get(params["instagram_url"])
    render json: {html: resource.html}
  end

end
