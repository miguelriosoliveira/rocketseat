defmodule Nlw07HeatTagsWeb.MessagesController do
	use Nlw07HeatTagsWeb, :controller

	alias Nlw07HeatTags.Messages.Create
	alias Nlw07HeatTags.Message
	alias Nlw07HeatTagsWeb.ErrorView

	def create(conn, params) do
		params
		|> Create.call()
		|> handle_create(conn)
	end

	defp handle_create({:ok, %Message{} = message}, conn) do
		conn
		|> put_status(:created)
		|> render("create.json", message: message)
	end

	defp handle_create({:error, %{result: result, status: status}}, conn) do
		conn
		|> put_status(status)
		|> put_view(ErrorView)
		|> render("error.json", result: result)
	end
end
