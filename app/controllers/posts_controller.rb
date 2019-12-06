class PostsController < ApplicationController

  before_action :authenticate_user!, except: [:index, :show]

  def index
    if current_user
      @posts = Post.all
    else
      @posts = Post.all.published
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    post = Post.new
    post.save!(validate: false)
    redirect_to edit_post_path(post)
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      redirect_to post_path(post)
    else
      @post = post
      render :edit
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy!
    flash[:notice] = "Post was deleted!"
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :post_body, :published, :author_id, tag_ids: [])
  end

end
