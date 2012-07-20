require 'rubygems'
require 'sinatra'
require 'httparty'
require "json"

get '/' do
  erb :index
end

get '/product' do
  content_type :json
  response = HTTParty.get("http://www.dev.notonthehighstreet.com/product_trends.json?timeframe=#{params[:timeframe]}")
  response.body.to_json
end

get '/product/:id' do
  content_type :json
  response = HTTParty.get("http://www.dev.notonthehighstreet.com/product_trends/#{params[:id]}.json?timeframe=#{params[:timeframe]}")
  response.body.to_json
end

get '/partner' do
  content_type :json
  response = HTTParty.get("http://www.dev.notonthehighstreet.com/partner_trends.json?timeframe=#{params[:timeframe]}")
  response.body.to_json
end

get '/partner/:id' do
  content_type :json
  response = HTTParty.get("http://www.dev.notonthehighstreet.com/partner_trends/#{params[:id]}.json?timeframe=#{params[:timeframe]}")
  response.body.to_json
end
