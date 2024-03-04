class Website < ApplicationRecord
  before_create :set_uuid
  validates :url, uniqueness: true, allow_nil: true

  private

  def set_uuid
    self.id = SecureRandom.uuid if self.id.blank?
  end
end
