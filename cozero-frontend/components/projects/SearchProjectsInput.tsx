import React, {
  ChangeEvent,
  ComponentProps,
  FC,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  InputGroup,
  Input,
  InputLeftElement,
  StyleProps,
} from "@chakra-ui/react";
import { translate } from "../../utils/language.utils";
import { useQueryParam } from "../../hooks/useQueryParam"
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

export const SearchProjectsInput: FC<StyleProps> = ({
  ...props
}): ReactElement => {
  const [query] = useQueryParam("q");
  const [value, setValue] = useState(query);

  const navigate = useNavigate();

  useEffect(() => {
    setValue(query)
  }, [query])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      navigate(
        value && value.length > 0 ? `/projects?q=${value}` : "/projects"
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <InputGroup {...props}>
      <InputLeftElement pointerEvents="none">
        <AiOutlineSearch />
      </InputLeftElement>
      <Input
        placeholder={translate("SEARCH_PROJECTS")}
        value={value ||  ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};
