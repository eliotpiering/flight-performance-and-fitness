class Post < ApplicationRecord
  before_validation :set_slug
  before_save :set_published_at

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

  def set_published_at
    return if self.published_at.present?
    return unless self.changes[:published] == [false, true]
    self.published_at = DateTime.now
  end
end
