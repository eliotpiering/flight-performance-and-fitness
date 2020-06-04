class AuthorsController < ApplicationController

  before_action :authenticate_user!

  def index
    @authors = Author.all
  end

  def new
    @author = Author.new
  end

  def create
    author = Author.new(author_params)
    author.save!
    redirect_to posts_path
  end

  def edit
    @author = Author.find(params[:id])
  end

  def update
    @author = Author.find(params[:id])
    if @author.update(author_params)
      redirect_to posts_path
    else
      render :edit
    end
  end

  def destroy
    author = Author.find(params[:id])
    author.destroy!
    flash[:notice] = "Author was deleted!"
    redirect_to posts_path
  end

  private

  def author_params
    params.require(:author).permit(:name)
  end

end
