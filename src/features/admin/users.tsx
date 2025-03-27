import {
  ChartLine,
  Ellipsis,
  ExternalLink,
  ListMusic,
  Music,
  Pencil,
  Trash,
  UserIcon,
  Users,
} from "lucide-react";
import styles from "./styles/page.module.css";
import tableStyles from "./styles/table.module.css";
import { User, users } from "../../types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu.tsx/dropdown-menu";
import { Button } from "../../components/button/button";
import Badge from "../../components/badge/badge";
import { AnalyticsCard } from "../../components/analytic-card/card";
import { useTheme } from "../../hooks/theme";
import { Link } from "react-router";
import { useModal } from "../../hooks/use-modal";

export const UsersPage = () => {
  const { theme } = useTheme();
  const { openModal } = useModal();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <Button
          size="medium"
          icon={<UserIcon />}
          onClick={() => {
            openModal("user.add", {
              title: "Add User",
              description: "Add a new user to the platform",
            });
          }}
        >
          Add User
        </Button>
      </div>
      <div className={styles.divider} />

      <div className={styles.cardContainer}>
        <AnalyticsCard
          label="Total Users"
          value="1,000"
          icon={<Users color="gray" />}
          color={theme === "light" ? "#d1d1d1" : "#202020"}
        />
        <AnalyticsCard
          label="New Users"
          value="2,000"
          sublabel="+12% this week"
          icon={<ChartLine color="gray" />}
          color={theme === "light" ? "#d1d1d1" : "#202020"}
        />
        <AnalyticsCard
          label="Total Playlists"
          value="3,000"
          sublabel="All Time"
          icon={<ListMusic color="gray" />}
          color={theme === "light" ? "#d1d1d1" : "#202020"}
        />
        <AnalyticsCard
          label="Total Tracks"
          value="4,000"
          sublabel="All Time"
          icon={<Music color="gray" />}
          color={theme === "light" ? "#d1d1d1" : "#202020"}
        />
      </div>

      <table className={tableStyles.tableContainer}>
        <thead className={tableStyles.tableHead}>
          <tr className={tableStyles.tableHeadRow}>
            <th
              className={`${tableStyles.tableHeader} ${tableStyles.w10} ${tableStyles.paddingLeftRight}`}
            >
              id
            </th>
            <th className={`${tableStyles.tableHeader}`}>name</th>
            <th className={`${tableStyles.tableHeader}`}>email</th>
            <th className={tableStyles.tableHeader}>email verified</th>
            <th className={tableStyles.tableHeader}>role</th>
            <th className={tableStyles.w8}></th>
          </tr>
        </thead>
        <tbody className={tableStyles.tableBody}>
          {users.map((user: User, index: number) => (
            <UserRow user={user} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function UserRow({ user }: { user: User }) {
  const { openModal } = useModal();

  return (
    <tr className={tableStyles.trackRow}>
      <td className={`${tableStyles.cell} ${tableStyles.indexCell}`}>
        {user.id}
      </td>

      <td className={tableStyles.cell}>{user.user_metadata.username}</td>

      <td className={`${tableStyles.cell} ${tableStyles.truncate}`}>
        {user.email}
      </td>
      <td className={`${tableStyles.cell}`}>
        <Badge
          label="Not Verified"
          size="tiny"
          borderRadius={999}
          color="danger"
        />
      </td>
      <td className={`${tableStyles.cell}`}>admin</td>

      <td className={tableStyles.cell}>
        <div className={tableStyles.menu}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="text" icon={<Ellipsis />} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("user.edit", {
                    title: `Edit ${user.user_metadata.username}`,
                    description: "Edit the user's following details",
                    formData: {
                      username: user.user_metadata.username,
                      bio: user.user_metadata.bio,
                      tags: user.user_metadata.tags,
                      avatar: user.user_metadata.avatar,
                      visibility: true,
                      is_onboarded: user.user_metadata.is_onboarded,
                      role: user.user_metadata.role,
                    },
                  });
                }}
              >
                <Pencil /> Edit
              </DropdownMenuItem>
              <Link to={`/profile/${user.id}`} target="_blank">
                <DropdownMenuItem>
                  <ExternalLink /> View
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("delete", {
                    title: `Delete ${user.user_metadata.username}`,
                    description: "Are you sure you want to delete this user?",
                    id: user.id,
                  });
                }}
              >
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
