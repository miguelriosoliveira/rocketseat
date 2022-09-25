defmodule Nlw07HeatTagsWeb.MessagesView do
	use Nlw07HeatTagsWeb, :view

	def render("create.json", %{message: message}) do
		%{
			result: "Message created!",
			message: message,
		}
	end
end
