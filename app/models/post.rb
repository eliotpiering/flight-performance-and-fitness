class Post < ApplicationRecord
  has_many_attached :post_medias
  has_many :post_tags
  has_many :tags, through: :post_tags

  belongs_to :author, optional: true

  scope :published, -> { where(published: true) }

  def body_preview
    post_body.truncate_words(3, separator: "<br>")
  end
end
