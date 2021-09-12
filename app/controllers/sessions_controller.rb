class SessionsController < ApplicationController
  before_action :authorize, only: [:logout] 
    def login
        # byebug
        user = User.find_by(user_name: params[:user_name])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            # byebug
            render json: user, status: :created
        else 
            render json: {errors: ["Invalid user name or password"]}, status: :unauthorized
        end
    end

    def logout
        # byebug
        # reset_session
        # session.clear
        # session.destroy
        session.delete :user_id
        # head :no_content
        render json: {success: "deleted"}
    end
    
end
