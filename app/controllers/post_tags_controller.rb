class PostTagsController < ApplicationController

  before_action :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    tag = Tag.find_or_create_by(title: params[:tag_title])
    PostTag.find_or_create_by(tag_id: tag.id, post_id: post.id)
    render json: {}, status: 201
  end

  def destroy
    post = Post.find(params[:post_id])
    tag = Tag.find(params[:id])
    post_tag = PostTag.find_by(post_id: post.id, tag_id: tag.id)
    post_tag.delete if post_tag
    render json: {}, status: 201
  end

end
