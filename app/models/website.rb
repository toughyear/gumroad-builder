class Website < ApplicationRecord
  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid if self.id.blank?
  end
end
