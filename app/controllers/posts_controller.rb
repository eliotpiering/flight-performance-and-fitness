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

  def new
    @post = Post.new
  end

  def create
    @post = Post.create!
    render :edit
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    redirect_to post
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
