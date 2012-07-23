require 'rubygems'
require 'sinatra'
require 'httparty'
require "json"

TOKEN = 'c8lto6pj9y9hl28vl3wq1q7jps62is8uj9jnsj3g'

get '/' do
  erb :index
end

get '/product' do
  content_type :json
  response = HTTParty.get("http://dw.notonthehighstreet.com/trends/products?timeframe=#{params[:timeframe]}&token=#{TOKEN}")
  response.body.to_json
end

get '/product/:id' do
  content_type :json
  response = HTTParty.get("http://dw.notonthehighstreet.com/trends/product/#{params[:id]}?timeframe=#{params[:timeframe]}&token=#{TOKEN}")
  response.body.to_json
end

get '/partner' do
  content_type :json
  response = HTTParty.get("http://dw.notonthehighstreet.com/trends/partners?timeframe=#{params[:timeframe]}&token=#{TOKEN}")
  response.body.to_json
end

get '/partner/:id' do
  content_type :json
  response = HTTParty.get("http://dw.notonthehighstreet.com/trends/partner/#{params[:id]}?timeframe=#{params[:timeframe]}&token=#{TOKEN}")
  response.body.to_json
end
