class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  private

  def render_unprocessable_entity_response(invalid)
    # byebug
    render json: { errors: [invalid.record.errors.full_messages] }, status: :unprocessable_entity
  end

  def authorize
    unless session.include?(:user_id)
      render json: { errors: ['Unauthorized access, please login'] },
             status: :unauthorized
    end
  end
end
