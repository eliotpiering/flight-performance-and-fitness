require "active_storage/service/s3_service"
require 'uri'

class ActiveStorage::Service::PublicS3 < ActiveStorage::Service::S3Service
  def public_url(key, **)
    url = object_for(key).public_url
    "https://ep-files.nyc3.cdn.digitaloceanspaces.com/#{URI(url).path}"
  end
end
