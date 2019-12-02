class PostMediasController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    post.post_medias.attach(media_params)
    render json: {url: url_for(post.post_medias.last)}, status: 201
  end

  private

  def media_params
    params.require(:file)
  end

end
