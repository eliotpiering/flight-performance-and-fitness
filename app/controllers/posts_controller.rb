class PostsController < ApplicationController

  before_action :authenticate_user!, except: [:index, :show]

  def index
    if current_user
      @posts = Post.all
    else
      @posts = Post.all.published
    end
    @posts = @posts.paginate(page: params[:page], per_page: 5)
    @posts = @posts.order(published_at: :desc)
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    post = Post.new(post_params)
    post.save!(validate: false)
    redirect_to edit_post_path(post)
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy!
    flash[:notice] = "Post was deleted!"
    redirect_to posts_path
  end

  def toggle_publish
    post = Post.find(params[:id])
    post.update(published: !post.published)
    flash[:notice] = "Post was #{post.published ? 'Published' : 'Unpublished'}!"
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :post_body, :published, :author_id, tag_ids: [])
  end

end
