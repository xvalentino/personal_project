class User < ActiveRecord::Base
  def self.find_or_create_from_auth(data)
    user = User.find_or_create_by(uid: data.uid)

    user.nickname = data.info.nickname
    user.image = data.info.image.sub("_normal", "")
    user.save
    user
  end
end
