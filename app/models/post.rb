class Post < ApplicationRecord
  before_validation :set_slug

  has_many_attached :post_medias
  has_many :post_tags
  has_many :tags, through: :post_tags
  belongs_to :author, optional: true

  scope :published, -> { where(published: true) }

  validates_presence_of [:title, :slug]

  def to_param
    return nil unless persisted?
    [id, slug].compact.join('-')
  end

  private

  def set_slug
    return if self.slug.present?
    slug = self.title.downcase.gsub(" ", "-")
    self.slug = CGI.escape(slug)
  end
end
